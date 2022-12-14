import { GlobalLoading, makeStyles, useMediaQuery } from '@cads-ui/core';
import useSelectorOnly from '~/hooks/useOnlySelector';
import MemberSlideShow from './SlideShow';

const useStyles = makeStyles((theme) => ({
  main: {
    w: '100vw',
    h: '100vh',
    display: 'flex'
  },

  slideShow: {
    flexGrow: 1
  }
}));

function PresentMemberView() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ down: 'md' });
  // Handle logic trong getPresentationByCode trước khi implement
  const presentation = useSelectorOnly('presentation', [], true);
  console.log(presentation);
  if (presentation.loading) return <GlobalLoading />;

  return (
    <div className={classes.main}>
      <div className={classes.slideShow}>
        <MemberSlideShow />
      </div>
    </div>
  );
}

export default PresentMemberView;