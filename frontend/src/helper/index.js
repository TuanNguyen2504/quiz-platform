import { LS_KEY } from '~/constant/key';
import { SLIDE_TYPES } from '~/constant/presentation';

export function getEnv(key = '') {
  return import.meta.env[key] || process.env[key];
}

export function isProduction() {
  return getEnv('MODE') === 'production';
}

export function getToken() {
  return localStorage.getItem(LS_KEY.ACCESS_TOKEN);
}

export function getOriginPath(path = '') {
  return `${window.location.origin}${path}`;
}

export function generateGroupInviteLink(groupCode) {
  return `${window.location.origin}/group/join?code=${groupCode}`;
}

export function generateUniqueString(length = 8) {
  let res = '';
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const alLength = alphabet.length;

  for (let i = 0; i < length; i++) {
    res += alphabet[~~(Math.random() * alLength)];
  }

  return res;
}

export function getOptionValue(options, choices) {
  const _choices = choices.slice();
  _choices.forEach((choice, idx) => {
    _choices[idx] = options.find((o) => o._id === choice);
  });
  return _choices;
}

export function openFullscreen(elem) {
  if (elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
}

export function getTitleName(type) {
  let res = 'Câu hỏi';
  switch (type) {
    case SLIDE_TYPES.HEADING:
      res = 'Heading';
      break;
    case SLIDE_TYPES.PARAGRAPH:
      res = 'Heading';
      break;
    default:
      res = 'Câu hỏi';
      break;
  }

  return res;
}

export function getPlaceHolderName(type) {
  let res = 'Nhập câu hỏi';
  switch (type) {
    case SLIDE_TYPES.HEADING:
      res = 'Nhập tiêu đề';
      break;
    case SLIDE_TYPES.PARAGRAPH:
      res = 'Nhập tiêu đề cho đoạn văn bản';
      break;
    default:
      res = 'Nhập câu hỏi';
      break;
  }

  return res;
}

export function getDesTitleName(type) {
  let res = 'Mô tả';
  switch (type) {
    case SLIDE_TYPES.HEADING:
      res = 'Subheading';
      break;
    case SLIDE_TYPES.PARAGRAPH:
      res = 'Paragraph';
      break;
    default:
      res = 'Mô tả';
      break;
  }

  return res;
}

export function getDesPlaceHolderName(type) {
  let res = 'Nhập mô tả (nếu có)';
  switch (type) {
    case SLIDE_TYPES.HEADING:
      res = 'Nhập tiêu đề phụ (nếu có)';
      break;
    case SLIDE_TYPES.PARAGRAPH:
      res = 'Nhập đoạn văn bản';
      break;
    default:
      res = 'Nhập mô tả (nếu có)';
      break;
  }

  return res;
}
