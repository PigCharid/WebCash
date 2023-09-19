

// xGorilla
async function main() {
  const newDefiStakeable = await ethers.getContractFactory("newDefiStakeable");
  console.log("Deploying newDefiStakeable...");
  const _newDefiStakeable = await newDefiStakeable.deploy("newDefi","newDefi");
  console.log("newDefiStakeable deployed to:", _newDefiStakeable.address);
}

// 这里也可以简化为 main()，后面的都省略也可以
main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });