import { Arr } from "../utils";
import { deepCopy, deepEqual } from "../utils/Object";

type FlipFlop = {
  type: "ff";
  high: boolean;
};
type Conjuction = {
  type: "c";
  lastHigh: Record<string, boolean>;
};

type Broadcast = {
  type: "b";
};

type Output = {
  type: "o" | "rx";
};

type State = Record<string, FlipFlop | Conjuction | Broadcast | Output>;

type Data = {
  state: State;
  modules: {
    [key: string]: {
      connections: Array<string>;
      type: "ff" | "b" | "c" | "o" | "rx";
    };
  };
};
const splitIntoStateModules = (acc: Data, line) => {
  const [name, list] = line.split(" -> ");
  const { state, modules } = acc;
  const connections = list.split(", ");

  if (name === "broadcaster") {
    state[name] = {
      type: "b",
    };

    modules[name] = {
      connections,
      type: "b",
    };
    return acc;
  }
  const [dateType, ...rest] = name.split("");
  const splitName = rest.join("");

  if (dateType === "%") {
    state[splitName] = {
      type: "ff",
      high: false,
    };

    modules[splitName] = {
      connections,
      type: "ff",
    };

    return acc;
  }

  if (dateType === "&") {
    state[splitName] = {
      type: "c",
      lastHigh: {},
    };

    modules[splitName] = {
      connections,
      type: "c",
    };

    return acc;
  }
  return acc;
};
export const parse = (text: string) => {
  const { state, modules } = text.split(/\n/).reduce(splitIntoStateModules, {
    state: { output: { type: "o" }, rx: { type: "rx" } },
    modules: {
      output: { type: "o", connections: [] },
      rx: { type: "rx", connections: [] },
    },
  });
  const initState = {};

  Object.keys(state).forEach((i) => {
    const iState = state[i];

    if (iState.type === "c") {
      const backwardConnections = Object.keys(modules).filter((m) => {
        const module = modules[m];
        if (module.connections.includes(i)) return true;
        return false;
      });

      const allConnections = [...backwardConnections];
      allConnections.forEach((c) => {
        const lastHigh = iState.lastHigh;
        lastHigh[c] = false;
        initState[i] = { ...iState, lastHigh };
      });
    } else {
      initState[i] = iState;
    }
  });
  return { state: initState, modules };
};

export const exercise = (text: string, part2?: boolean) => {
  const { state: initState, modules } = parse(text);
  const state = deepCopy(initState);

  const rxConnection = Object.keys(modules).find((m) =>
    modules[m].connections.includes("rx")
  );

  const rxConjunction = part2
    ? Object.keys(state[rxConnection].lastHigh).reduce((acc, curr) => {
        acc[curr] = 0;

        return acc;
      }, {})
    : {};

  let highPulses = 0;
  let lowPulses = 0;
  let buttonPresses = 0;

  const pushButton = () => {
    let toRxLow: boolean = false;
    buttonPresses += 1;

    const queue = [
      { name: "broadcaster", sentPulseHigh: false, from: "button" },
    ];

    while (queue.length) {
      const { name, sentPulseHigh, from } = queue.shift();

      const { connections, type } = modules[name];

      if (rxConjunction[name] === 0 && !sentPulseHigh) {
        toRxLow = true;
      }

      if (type === "b") {
        lowPulses += 1;

        connections.forEach((c) => {
          lowPulses += 1;
          queue.push({ name: c, sentPulseHigh, from: name });
        });
      }

      if (type === "ff") {
        const { high } = state[name];
        if (!sentPulseHigh) {
          if (high) {
            connections.forEach((c) => {
              lowPulses += 1;
              queue.push({ name: c, sentPulseHigh: false, from: name });
            });
            state[name].high = false;
          } else {
            connections.forEach((c) => {
              highPulses += 1;
              queue.push({ name: c, sentPulseHigh: true, from: name });
            });
            state[name].high = true;
          }
        }
      }

      if (type === "c") {
        state[name].lastHigh[from] = sentPulseHigh;

        const allHigh = Object.values(state[name].lastHigh).reduce(
          (acc, curr) => acc && curr,
          true
        );

        if (allHigh) {
          connections.forEach((c) => {
            lowPulses += 1;
            queue.push({ name: c, sentPulseHigh: false, from: name });
          });
        } else {
          connections.forEach((c) => {
            highPulses += 1;
            queue.push({ name: c, sentPulseHigh: true, from: name });
          });
        }
      }
    }

    return toRxLow;
  };

  const loops = new Arr([]);
  const foundConnections = [];
  if (!part2) {
    for (let i = 0; i < 1000; i++) {
      pushButton();
    }

    return highPulses * lowPulses;
  }

  let loop = 0;
  while (foundConnections.length !== 4) {
    const found = pushButton();
    if (found) {
      loops.push(loop + 1);
      foundConnections.push(found);
    }

    loop += 1;
  }

  return loops.lcm;
};
