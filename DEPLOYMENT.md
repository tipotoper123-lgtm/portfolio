# Как опубликовать ваше портфолио

Ваш сайт полностью готов к публикации. Самый простой и бесплатный способ разместить его в интернете — использовать **GitHub Pages** или **Netlify**.

## Вариант 1: GitHub Pages (Рекомендуемый)

1.  **Создайте репозиторий на GitHub**
    *   Зайдите на [github.com](https://github.com) и создайте новый публичный репозиторий (например, `portfolio`).

2.  **Загрузите файлы**
    *   Откройте папку проекта: `c:\Users\bogom\OneDrive\Документы\Gemeni\Projects\portfolio`
    *   Инициализируйте git и отправьте файлы:
    ```bash
    cd c:\Users\bogom\OneDrive\Документы\Gemeni\Projects\portfolio
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/ВАШ_НИК/portfolio.git
    git push -u origin main
    ```

3.  **Включите GitHub Pages**
    *   Перейдите в настройки репозитория (Settings) -> Pages.
    *   В разделе "Build and deployment" под "Source" выберите "Deploy from a branch".
    *   Под "Branch" выберите `main` и папку `/ (root)`.
    *   Нажмите Save.

Через пару минут ваш сайт будет доступен по адресу: `https://ВАШ_НИК.github.io/portfolio/`

---

## Вариант 2: Netlify (Drag & Drop)

1.  Зайдите на [netlify.com](https://www.netlify.com/) и войдите в аккаунт (можно через GitHub).
2.  Нажмите "Add new site" -> "Deploy manually".
3.  Просто перетащите папку `portfolio` в область загрузки в браузере.
4.  Сайт будет опубликован мгновенно. Вы сможете изменить доменное имя в настройках "Domain settings".

---

## Вариант 3: Обычный хостинг

Просто загрузите файлы `index.html`, `style.css` и `script.js` в корневую папку вашего хостинга (обычно `public_html` или `www`) через FTP или файловый менеджер.
