const welcomeText = [
    'Welcome !',
    'ようこそ !',
    '환영합니다 !',
    '欢迎 !',
    'Selamat Datang !',
];

export default function () {
    const random = Math.floor(Math.random() * ((4 - 0) + 1)) + 0;
    return welcomeText[random];
}
