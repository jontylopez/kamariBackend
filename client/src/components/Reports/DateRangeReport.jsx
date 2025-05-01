import React, { useState } from 'react';
import { 
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { DownloadIcon, CalendarIcon } from '@chakra-ui/icons';
import axios from 'axios';

const DateRangeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      // Validate dates
      if (!startDate || !endDate) {
        toast({
          title: 'Error',
          description: 'Please select both start and end dates',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (new Date(startDate) > new Date(endDate)) {
        toast({
          title: 'Error',
          description: 'Start date cannot be after end date',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Make API call to download report
      const response = await axios.get(
        `/api/reports/report/date/${startDate}/${endDate}`,
        {
          responseType: 'blob', // Important for file download
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `POS_Report_${startDate}_to_${endDate}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: 'Report downloaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      toast({
        title: 'Error',
        description: 'Failed to download report. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodayReport = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
  };

  const handleThisWeekReport = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    
    setStartDate(firstDay.toISOString().split('T')[0]);
    setEndDate(lastDay.toISOString().split('T')[0]);
  };

  const handleThisMonthReport = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setStartDate(firstDay.toISOString().split('T')[0]);
    setEndDate(lastDay.toISOString().split('T')[0]);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Generate Date Range Report
        </Text>

        <HStack spacing={4}>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleTodayReport}
            leftIcon={<CalendarIcon />}
          >
            Today
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleThisWeekReport}
            leftIcon={<CalendarIcon />}
          >
            This Week
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleThisMonthReport}
            leftIcon={<CalendarIcon />}
          >
            This Month
          </Button>
        </HStack>

        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleDownload}
          isLoading={isLoading}
          leftIcon={<DownloadIcon />}
        >
          Download Report
        </Button>
      </VStack>
    </Box>
  );
};

export default DateRangeReport; 