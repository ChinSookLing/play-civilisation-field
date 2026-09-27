import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const mod = await vite.ssrLoadModule("/src/lib/play/agreement.ts");
  const problems = [
    ...mod.agreementProblems(),
    ...mod.practiceRejectionProblems(),
    ...mod.practiceCapProblems(),
    ...mod.move71EvidenceProblems(),
  ];
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  }
} finally {
  await vite.close();
}
