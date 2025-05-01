import React from 'react';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import DateRangeReport from '../components/Reports/DateRangeReport';

const Reports = () => {
  return (
    <Container maxW="container.xl" py={5}>
      <Box mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Reports
        </Text>
      </Box>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Date Range Report</Tab>
          {/* Add more tabs for other report types if needed */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <DateRangeReport />
          </TabPanel>
          {/* Add more TabPanels for other report types */}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Reports; 