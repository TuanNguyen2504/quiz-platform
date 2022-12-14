import {
  Avatar,
  Box,
  Divider,
  Flex,
  makeStyles,
  Typography
} from '@cads-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PATH } from '~/constant/path';

const useStyles = makeStyles((_) => ({
  icon: {
    fs: 24,
    cursor: 'pointer',
    color: 'grey.500',
    flexShrink: 0,
    '&:hover': {
      color: 'grey.700'
    }
  }
}));

function CardGroupItem({ group = {} }) {
  const classes = useStyles();

  const { name, owner = {}, desc, _id, createdAt } = group;
  const { name: ownerName, avt } = owner;

  return (
    <Link to={`${PATH.MANAGE_GROUP.ROOT}/${_id}`}>
      <Box
        sx={{ borderRadius: 2, shadow: 4, p: 4, w: 1, _hover: { shadow: 8 } }}
      >
        {/* Card top */}
        <Flex justifyContent="space-between">
          <Flex spacing={4}>
            <Avatar src={avt} alt={ownerName} sx={{ flexShrink: 0 }} />
            <Flex direction="column" spacing={1}>
              <Typography
                fs={24}
                sx={{ wordBreak: 'break-all' }}
                color="secondary.main"
                maxLine={1}
              >
                {name}
              </Typography>
              <Typography fs={14} color="text.secondary">
                Tạo bởi: {ownerName} - {moment(createdAt).format('DD/MM/YYYY')}
              </Typography>
            </Flex>
          </Flex>
        </Flex>

        {/* Card body */}
        {desc && (
          <>
            <Divider spacing={2} />
            <Typography color="text.secondary">{desc}</Typography>
          </>
        )}
      </Box>
    </Link>
  );
}

export default CardGroupItem;
