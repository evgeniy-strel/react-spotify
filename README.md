# 🎧 React Spotify  

Музыкальный сервис, работающий через API Spotify. Интерфейс и функционал близки к Spotify.  

---

## 🛠 Технологии
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![Spotify](https://img.shields.io/badge/Spotify%20API-1ED760?style=for-the-badge&logo=spotify&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Возможности  
- 🔑 Синхронизация через аккаунт Spotify
- ▶️ Управление плеером
- 🎶 Проигрывание по артисту, альбому или треку
- 📱 Адаптивный интерфейс (desktop + mobile)

## 📂 Функционал приложения

#### 🏠 Главная — содержит 4 блока: недавно прослушанное, подписки, любимое и новое

<details>
  <summary>💻 Скриншот веба</summary>

  ![Главная (Web)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/web/main-page.jpg?raw=true)
</details>

<details>
  <summary>📱 Скриншот мобилки</summary>

  ![Главная (Mobile)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/mobile/main-page.jpg?raw=true)
</details>

#### 🎤 Артист — страница с информацией об исполнителе и его треках  

<details>
  <summary>💻 Скриншот веба</summary>

  ![Главная (Web)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/web/artist-page.jpg?raw=true)
</details>

<details>
  <summary>📱 Скриншот мобилки</summary>

  ![Главная (Mobile)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/mobile/artist-page.jpg?raw=true)
</details>

#### 📀 Альбом — страница с обложкой, треками и другими альбомами артиста

<details>
  <summary>💻 Скриншот веба</summary>

  ![Главная (Web)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/web/album-page.jpg?raw=true)
</details>

<details>
  <summary>📱 Скриншот мобилки</summary>

  ![Главная (Mobile)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/mobile/album-page.jpg?raw=true)
</details>

#### ▶️ Плеер — задний фон адаптируется под проигрываемый трек

<details>
  <summary>💻 Скриншот веба</summary>

  ![Плеер (Web)](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/web/player-view.jpg?raw=true)
</details>

<details>
  <summary>📱 Скриншот мобилки</summary>

| ![Мобилка 1](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/mobile/player-view.jpg?raw=true) | ![Мобилка 2](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/mobile/player-view-2.jpg?raw=true) |
|:---:|:---:|

</details>

## 🎬 Видеодемонстрация
[![Демо видео](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/demo-gif.gif?raw=true)](https://github.com/evgeniy-strel/react-spotify/raw/refs/heads/master/screens/demo.mp4)
> 🎵 Для проигрывания со звуком скачайте видео, кликнув по нему


## 📦 Установка и запуск

> ⚠️ Для проигрывания музыки необходим **Spotify Premium** (ограничение API) и иметь открытую соседнюю вкладку страницы Spotify.


1) Склонируйте репозиторий
```bash
git clone https://github.com/evgeniy-strel/react-spotify.git
```

2) Создайте в корне проекта файл .env и укажите ключ CLIENT_ID в нем: для этого по [инструкции](https://developer.spotify.com/documentation/web-api) нужно создать приложение через Spotify API, и также выставить редирект на localhost.
![Spotify App](https://github.com/evgeniy-strel/react-spotify/blob/master/screens/spotify-app-settings.jpg?raw=true)
В итоге файл .env должен выглядеть так:
```bash
REACT_APP_CLIENT_ID = YOUR_CLIENT_ID
```

3) Установите зависимости
```bash
npm install
```
4) Запустите проект
```bash
npm start
```
