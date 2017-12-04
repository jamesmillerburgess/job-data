const pipe = (data, fns) => {
  let nextData = data;
  for (let i = 0; i < fns.length; i++) {
    printjson(`piping function #${i + 1}: ${fns[i].name}`);
    nextData = fns[i](nextData);
  }
  return nextData;
};
