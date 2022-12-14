import { Alert, Flex, makeStyles } from '@cads-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Badge,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Link,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import userApi from '~/apis/userApi';
import { MAX, REGEX } from '~/constant/validation';
import { updateUserInfo } from '~/redux/slices/userSlice';

const usernameSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required()
    .matches(REGEX.USER_NAME, 'Username không hợp lệ')
});
const nameSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required()
    .matches(REGEX.NAME, 'Tên không hợp lệ')
    .max(MAX.NAME)
});

const avtSchema = yup.object({
  name: yup.string().trim().url()
});

const useStyles = makeStyles((_) => ({
  badgeIcon: {
    cursor: 'pointer',
    backgroundColor: 'white',
    w: 24,
    h: 24,
    p: 1,
    borderRadius: '50%',
    border: '1px solid black',
    '&:hover': {
      color: 'grey.700'
    }
  }
}));

function FormDialog({
  isOpen,
  onCancel,
  title,
  content,
  defaultValue,
  fieldName
}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      fieldName === 'name'
        ? nameSchema
        : fieldName === 'avt'
        ? avtSchema
        : usernameSchema
    )
  });

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const res = await userApi.postUpdateUser({
        updateField: fieldName,
        updateContent: getValues(fieldName)
      });
      if (res.status === 200) {
        toast.success('Cập nhật thông tin thành công');
        dispatch(updateUserInfo({ [fieldName]: getValues(fieldName) }));
        onCancel();
      }
    } catch (error) {
      toast.error(
        `Có lỗi xảy ra, vui lòng kiểm tra lại: ${error.response?.data?.message}`
      );
    }
  };
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{`Chỉnh sửa ${title}`}</DialogTitle>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={title}
            type="text"
            fullWidth
            variant="standard"
            defaultValue={defaultValue}
            error={Boolean(errors[fieldName])}
            {...register(fieldName)}
          />
          {Object.keys(errors).length > 0 && (
            <Alert variant="standard" type="error">
              {errors[Object.keys(errors)[0]].message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </FormControl>
    </Dialog>
  );
}

function UserInfo({ title, content }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Flex direction="column" spacing={2}>
      <Typography variant="h5">{title}</Typography>
      {title === 'Email' || title === 'Ngày đăng ký' ? (
        content
      ) : (
        <Link href="#" underline="none" onClick={handleClickOpen}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={5}
            onClick={handleClickOpen}
          >
            {content}
            <Icon icon="material-symbols:edit" />
          </Flex>
        </Link>
      )}
      <FormDialog
        isOpen={open}
        onCancel={handleClose}
        title={title}
        content={`${title} mới của bạn là`}
        defaultValue={content}
        fieldName={title === 'Tài khoản' ? 'username' : 'name'}
      />
    </Flex>
  );
}

function ProfilePage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { username, name, email, avt, createdAt } = useSelector(
    (state) => state.user
  );
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={5}
      >
        <div>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Icon
                icon="material-symbols:edit"
                className={classes.badgeIcon}
                onClick={handleClickOpen}
              />
            }
          >
            <Avatar alt={name} src={avt} sx={{ width: 96, height: 96 }} />
          </Badge>
        </div>
        <Flex direction="column" spacing={4} sx={{ w: 1 }}>
          <UserInfo title="Họ tên" content={name} />
          <UserInfo title="Tài khoản" content={username} />
          <UserInfo title="Email" content={email} />
          <UserInfo
            title="Ngày đăng ký"
            content={moment(createdAt).format('DD/MM/YYYY')}
          />
        </Flex>
      </Flex>
      <FormDialog
        isOpen={open}
        onCancel={handleClose}
        title="Avatar"
        content="Link avatar của bạn"
        defaultValue={avt}
        fieldName="avt"
      />
    </Container>
  );
}

export default ProfilePage;
