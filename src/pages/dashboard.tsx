import { Header } from '../components/Header/Index'
import dynamic from 'next/dynamic'
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar/Index'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'),{
  ssr: false,
}
)

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-09-01T00:00:00.000Z',
      '2021-09-02T00:00:00.000Z',
      '2021-09-03T00:00:00.000Z',
      '2021-09-04T00:00:00.000Z',
      '2021-09-05T00:00:00.000Z',
      '2021-09-06T00:00:00.000Z',
      '2021-09-07T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}

const series = [
  {name : 'series1', data: [24, 45, 54, 123, 31, 109, 87 ] }
]


export default function Dashboard() {
  return (
    <Flex direction="column" height="100vh">
      <Header />

      <Flex width="100%" marginY="6" maxWidth={1480} marginX="auto" paddingX="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            padding={["6","8"]}
            backgroundColor="gray.800"
            borderRadius={8}
            paddingBottom="4"
          >
            <Text fontSize="lg" marginBottom="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            padding={["6","8"]}
            backgroundColor="gray.800"
            borderRadius={8}
            paddingBottom="4"
          >
            <Text fontSize="lg" marginBottom="4">Taxa de abertura</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
        
    )
}