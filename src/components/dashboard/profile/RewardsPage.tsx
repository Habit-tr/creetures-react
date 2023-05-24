import { Tab, TabList, TabPanels, TabPanel, Tabs } from "@chakra-ui/react";
import Rewards from "./Rewards";
import EarnedRewardsTable from "./EarnedRewardsTable";
import RedeemedRewards from "./RedeemedRewards";


const RewardsPage = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Create Rewards</Tab>
        <Tab>Redeem Rewards</Tab>
        <Tab>View Redeemed Rewards</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Rewards />
        </TabPanel>
        <TabPanel>
          <EarnedRewardsTable />
        </TabPanel>
        <TabPanel>
          <RedeemedRewards />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RewardsPage;
