import { planService } from "./services/plan.service";

async function test() {
  const result = await planService.generatePlan(
    "Build an AI startup in 30 days",
  );

  console.log(result);
}

test();
