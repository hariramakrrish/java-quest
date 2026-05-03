import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RunResult {
  stdout: string;
  stderr: string;
  compileError: string;
  exitCode: number | null;
  provider: string;
}

async function runWithJudge0(code: string, stdin: string): Promise<RunResult> {
  const key = process.env.JUDGE0_API_KEY!;
  const host =
    process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com";
  const submitUrl = `https://${host}/submissions?base64_encoded=true&wait=true`;
  const body = {
    source_code: Buffer.from(code).toString("base64"),
    language_id: 62, // Java (OpenJDK 13.0.1)
    stdin: stdin ? Buffer.from(stdin).toString("base64") : "",
    cpu_time_limit: 5,
    wall_time_limit: 8,
  };
  const res = await fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`judge0 ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const dec = (s: string | null | undefined) =>
    s ? Buffer.from(s, "base64").toString("utf8") : "";
  return {
    stdout: dec(j.stdout).replace(/\s+$/, ""),
    stderr: dec(j.stderr).trim(),
    compileError: dec(j.compile_output).trim(),
    exitCode: j.status?.id === 3 ? 0 : (j.exit_code ?? null),
    provider: "judge0",
  };
}

async function runWithCodex(code: string, stdin: string): Promise<RunResult> {
  // Free, public Codex API maintained by jaagrav.
  const res = await fetch("https://api.codex.jaagrav.in/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language: "java", input: stdin || "" }),
  });
  if (!res.ok) throw new Error(`codex ${res.status}: ${await res.text()}`);
  const j = await res.json();
  return {
    stdout: (j.output || "").replace(/\s+$/, ""),
    stderr: (j.error || "").trim(),
    compileError: "",
    exitCode: null,
    provider: "codex",
  };
}

async function runWithPiston(code: string, stdin: string): Promise<RunResult> {
  const url =
    process.env.PISTON_URL || "https://emkc.org/api/v2/piston/execute";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "java",
      version: "15.0.2",
      files: [{ name: "Main.java", content: code }],
      stdin,
      compile_timeout: 10000,
      run_timeout: 6000,
    }),
  });
  if (!res.ok) throw new Error(`piston ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return {
    stdout: (data.run?.stdout || "").replace(/\s+$/, ""),
    stderr: (data.run?.stderr || "").trim(),
    compileError: (data.compile?.stderr || "").trim(),
    exitCode: data.run?.code ?? null,
    provider: "piston",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { code, stdin } = await req.json();
    if (typeof code !== "string" || !code.trim()) {
      return NextResponse.json({ error: "code is required" }, { status: 400 });
    }
    const errors: string[] = [];

    // Try providers in order until one succeeds.
    const providers: Array<[string, () => Promise<RunResult>]> = [];
    if (process.env.JUDGE0_API_KEY)
      providers.push(["judge0", () => runWithJudge0(code, stdin ?? "")]);
    if (process.env.PISTON_URL)
      providers.push(["piston-self", () => runWithPiston(code, stdin ?? "")]);
    providers.push(["codex", () => runWithCodex(code, stdin ?? "")]);
    providers.push(["piston-public", () => runWithPiston(code, stdin ?? "")]);

    for (const [name, fn] of providers) {
      try {
        const out = await fn();
        return NextResponse.json(out);
      } catch (e) {
        errors.push(`${name}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    return NextResponse.json(
      {
        error:
          "All code-runner providers failed. Set JUDGE0_API_KEY (RapidAPI) or PISTON_URL to enable execution.",
        details: errors,
      },
      { status: 502 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
