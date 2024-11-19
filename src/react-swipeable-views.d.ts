declare module 'react-swipeable-views' {
  import { ComponentType } from 'react';

  interface SwipeableViewsProps {
    index?: number;
    onChangeIndex?: (index: number) => void;
    children?: React.ReactNode;
  }

  const SwipeableViews: ComponentType<SwipeableViewsProps>;

  export default SwipeableViews;
}
