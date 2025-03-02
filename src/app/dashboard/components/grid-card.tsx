import { FC } from 'react';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

type GridCardType = {
  title: string;
  totalNumberCurrentYear: number;
  totalNumberPercInComparisonFromPrevYear: number;
  totalNumberValueInComparisonFromPrevYear: number;
};

export const GridCard: FC<GridCardType> = (props) => {
  const { title, totalNumberCurrentYear, totalNumberPercInComparisonFromPrevYear } = props;
  const isNegative = totalNumberPercInComparisonFromPrevYear < 0 ? true : false;

  return (
    <Card>
      <CardContent>
        <Typography component='div' color='text.secondary' gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h6' gutterBottom sx={{ pr: 2 }}>
            {totalNumberCurrentYear}
          </Typography>
          <Chip
            icon={isNegative ? <TrendingDown /> : <TrendingUp />}
            label={`${totalNumberPercInComparisonFromPrevYear}%`}
            color={isNegative ? 'error' : 'success'}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
