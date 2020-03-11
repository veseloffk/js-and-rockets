const prepareData = launches => {
  const preparedData = launches.reduce((res, launch) => {
    const {
      launch_year,
      flight_number,
      mission_name,
      rocket: {
        second_stage: { payloads }
      }
    } = launch;

    const payloads_count = payloads.some(({ customers }) =>
      customers.some(customer => customer.includes("NASA"))
    )
      ? payloads.length
      : 0;

    if (payloads_count > 0 && launch_year === "2018") {
      res.push({ flight_number, mission_name, payloads_count });
    }

    return res;
  }, []);

  return preparedData.sort((first, second) => {
    if (first.payloads_count !== second.payloads_count) {
      return second.payloads_count - first.payloads_count;
    } else {
      return second.flight_number - first.flight_number;
    }
  });
};

const renderData = data => {
  let spaceCounter = 0;
  const SPACE = " ";

  const output = JSON.stringify(data).replace(
    /(\{|\[)|(\}|\])|(,)|(:)/g,
    (match, open, close, comma, colon) => {
      if (open) {
        spaceCounter += 2;
        const spaces = SPACE.repeat(spaceCounter);
        return `${match}\n${spaces}`;
      } else if (close) {
        spaceCounter -= 2;
        const spaces = SPACE.repeat(spaceCounter);
        return `\n${spaces}${match}`;
      } else if (comma) {
        const spaces = SPACE.repeat(spaceCounter);
        return `${match}\n${spaces}`;
      } else if (colon) {
        return `${match} `;
      } else {
        return match;
      }
    }
  );

  const pre = document.getElementById("out");
  pre.innerHTML = output;
  document.body.append(pre);
};

module.exports = {
  prepareData,
  renderData
};
