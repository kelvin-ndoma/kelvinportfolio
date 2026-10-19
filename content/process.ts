export const processSteps = [
  {
    index: "01",
    title: "Understand",
    body: "Map how the work moves today: who does what, where information lives, and where time, errors and hand-offs pile up.",
    output: "Current-state workflow and the problems worth solving",
  },
  {
    index: "02",
    title: "Design",
    body: "Define the target workflow, data model, business rules and roles before writing code, so the system reflects the agreed process.",
    output: "System design, scope and delivery order",
  },
  {
    index: "03",
    title: "Build",
    body: "Deliver in working vertical slices, with rules and permissions enforced on the server and automated checks on every change.",
    output: "Working, tested software",
  },
  {
    index: "04",
    title: "Improve",
    body: "Refine with the people using it, move remaining manual steps into the system and automate what has become routine.",
    output: "Iterations driven by real use",
  },
] as const;
