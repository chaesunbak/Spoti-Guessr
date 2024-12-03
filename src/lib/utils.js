import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function translateToKorean(word) {
  switch (word) {
    case 'artists':
      return '아티스트';
    case 'albums':
      return '앨범';
    case 'tracks':
      return '트랙';
    default:
      throw new Error(`${word}는 utils translateToKorean함수가 지원하지 않습니다.`);
  }
}

export function getRandomNickname() {
  const words1 = [
    '배고픈',
    '귀여운',
    '용감한',
    '날쌘',
    '똑똑한',
    '멋진',
    '기분 좋은',
    '화난',
    '즐거운',
    '슬픈',
    '행복한',
    '신비로운',
    '빛나는',
    '어두운',
    '밝은',
    '차가운',
    '따뜻한',
    '거대한',
    '작은',
    '영리한',
    '모험적인',
    '조심스러운',
    '무서운',
    '사랑스러운',
    '강력한',
    '약한',
    '친절한',
    '무관심한',
    '호기심 많은',
    '지혜로운',
    '성급한',
    '느긋한',
    '정열적인',
    '차분한',
    '심각한',
    '우스꽝스러운',
    '명랑한',
    '괴팍한',
    '신선한',
    '순수한',
    '잘생긴',
    '아름다운',
    '우아한',
    '거친',
    '단순한',
    '복잡한',
    '현명한',
    '어린',
    '노련한',
    '건강한',
    '아픈',
    '강건한',
    '약한',
    '평화로운',
    '소란스러운',
    '빠른',
    '느린',
    '적극적인',
    '수줍은',
    '자신감 있는',
    '피곤한',
    '활기찬',
    '무료한',
    '흥미로운',
    '지루한',
    '매력적인',
    '무덤덤한',
    '관대한',
    '인색한',
    '용서하는',
    '복수심 많은',
    '신뢰하는',
    '의심 많은',
    '정직한',
    '속이는',
    '놀란',
    '기대하는',
    '걱정하는',
    '확신하는',
    '불확실한',
    '성실한',
    '게으른',
    '적극적인',
    '부정적인',
    '긍정적인',
    '희망찬',
    '절망적인',
    '자유로운',
    '구속된',
    '포근한',
    '시원한',
    '뜨거운',
    '추운',
    '미끄러운',
    '거친',
    '부드러운',
    '단단한',
    '유연한',
    '가벼운',
    '무거운',
  ];

  const randomWord1 = words1[Math.floor(Math.random() * words1.length)];

  const words2 = [
    '사자',
    '고양이',
    '호랑이',
    '토끼',
    '앵무새',
    '늑대',
    '여우',
    '곰',
    '판다',
    '기린',
    '코끼리',
    '쥐',
    '햄스터',
    '다람쥐',
    '말',
    '소',
    '양',
    '돼지',
    '닭',
    '오리',
    '거위',
    '고슴도치',
    '사슴',
    '비버',
    '카멜레온',
    '코브라',
    '독수리',
    '펭귄',
    '상어',
    '고래',
    '문어',
    '해마',
    '갈매기',
    '바다표범',
    '물개',
    '카피바라',
    '캥거루',
    '왈라비',
    '타조',
    '에뮤',
    '악어',
    '가오리',
    '나비',
    '잠자리',
    '메뚜기',
    '벌',
    '개미',
    '거미',
    '뱀',
    '용',
    '유니콘',
    '피닉스',
    '드래곤',
    '머메이드',
    '센타우루스',
    '미노타우로스',
    '스핑크스',
    '그리핀',
    '고블린',
    '엘프',
    '드워프',
    '트롤',
    '요정',
    '마법사',
    '마녀',
    '오크',
    '바실리스크',
    '히드라',
    '켄타우로스',
    '페가수스',
    '기계인간',
    '로봇',
    '안드로이드',
    '사이보그',
    '외계인',
    '우주선',
    '별',
    '달',
    '해',
    '구름',
    '바람',
    '비',
    '눈',
    '번개',
    '태풍',
    '토네이도',
    '지진',
    '화산',
    '산',
    '강',
    '바다',
    '호수',
    '숲',
    '정글',
    '사막',
    '얼음',
    '빙하',
    '동굴',
    '섬',
    '하늘',
  ];

  const randomWord2 = words2[Math.floor(Math.random() * words2.length)];

  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  return `${randomWord1} ${randomWord2} ${randomNumber}`;
}

/**
 * 지정된 최소값과 최대값(포함) 사이의 랜덤 숫자를 생성합니다.
 *
 * @param {number} min - 최소값.
 * @param {number} max - 최대값.
 * @return {number} - 생성된 랜덤 숫자.
 */
export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
