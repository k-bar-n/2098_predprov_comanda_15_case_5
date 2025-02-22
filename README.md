## Полный план работы, включающий объяснение всех тонкостей, назначения файлов и логику работы приложения и его текущее состояние:

**1. Анализ требований**

- **Цель:** Разработать веб-приложение для управления спортивным инвентарем в школе, используя JSON-файлы (в будущем будет использоваться SQLAlchemy) для хранения данных.
- **Пользователи:**
  - **Администратор:** Обладает полным доступом к управлению инвентарем, пользователями, закупками и отчетами.
  - **Пользователь:** Имеет ограниченный доступ, может просматривать инвентарь, подавать заявки и отслеживать их статус.
- **Функциональность:**
  - **Администратор:**
    - Авторизация: Обеспечивает доступ к административным функциям.
    - Управление инвентарем: Добавление, редактирование, просмотр и удаление предметов инвентаря.
    - Закрепление инвентаря: Назначение инвентаря пользователям.
    - Планирование закупок: Добавление, просмотр и управление планами закупок.
    - Создание отчетов: Формирование отчетов о состоянии и использовании инвентаря.
    - Создание заявок: Создание заявок на получение, ремонт или замену инвентаря.
  - **Пользователь:**
    - Регистрация/Авторизация: Обеспечивает доступ к пользовательским функциям.
    - Просмотр инвентаря: Просмотр доступного инвентаря и его состояния.
    - Подача заявок: Создание заявок на получение, ремонт или замену инвентаря.
    - Отслеживание статуса заявок: Просмотр текущего статуса поданных заявок.
- **Технические требования:**
  - Веб-интерфейс: Приложение должно быть доступно через веб-браузер.
  - Клиент-серверная архитектура (упрощенная): Приложение использует модель клиент-сервер, где клиент (браузер) взаимодействует с сервером (Flask).
  - JSON для хранения данных: Данные хранятся в формате JSON в отдельных файлах.
  - Система контроля версий: Использование Git для отслеживания изменений кода.
  - Упрощенная установка: Инструкция для запуска приложения.
  - Безопасность: Работа сайта на https, с использованием самоподписанного сертификата (для теста)
- **Общие требования:**
  - **Использование только POST-запросов:** Весь обмен данными между клиентом и сервером должен осуществляться через POST-запросы.
  - **Стиль и интерфейс:** Увеличен масштаб интерфейса, сделан более крупным и читаемым, разработан более современный и привлекательный дизайн.
  - **Анимации:** Используются плавные анимации для всех переходов, появлений и исчезновений элементов.
  - **Сообщения об ошибках:** Все сообщения об ошибках должны быть оформлены в едином стиле, быть заметными и легко читаемыми, и выводиться под всеми блоками ввода.
  - **Синхронизация:** Все анимации и проверки должны выполняться синхронно и плавно.
  - **Расстояния:** Между полями ввода должно быть расстояние, чтобы текст не сливался.
  - **Отсутствие кэширования:** Сайт не должен сохранять данные в кэш браузера.
  - **Поддержка кириллицы:** Сайт должен корректно отображать кириллицу.
- **Документация:**
  - Титульный лист (с указанием названия кейса и перечислением членов команды).
  - Обоснование выбора технологий (языка программирования и используемых программных средств).
  - Структурная и функциональная схемы программного продукта.
  - Блок-схема работы основного алгоритма.
  - Описание особенностей и аргументация выбранного типа СУБД (сейчас использвуется JSON, в будщем планируется переход на SQLAlchemy).
  - Схема базы данных.
  - Программный код (ссылка на репозиторий), файл README должен включать:
    - краткое описание проекта;
    - инструкцию по установке/развертыванию;
    - ссылку на видеоролик.

**2. План разработки**

1.  **Выбор технологий:**

    - **Язык программирования:** Python 3.x.
      - **Обоснование:** Python - простой в освоении и широко используемый язык, подходящий для веб-разработки.
    - **Веб-фреймворк:** Flask.
      - **Обоснование:** Flask – минималистичный и легкий веб-фреймворк, удобный для создания простых веб-приложений.
    - **Фронтенд:** HTML, CSS, JavaScript.
      - **Обоснование:** Стандартные технологии для создания пользовательского интерфейса.
    - **Система контроля версий:** Git.
      - **Обоснование:** Git – необходимый инструмент для отслеживания изменений в коде и совместной работы.
    - **Управление зависимостями:** pip.
      - **Обоснование:** pip – стандартный менеджер пакетов для Python.

2.  **Структура данных (JSON-файлы):**

    - **`users.json`:**

      - **Назначение:** Хранит информацию о пользователях приложения (администраторах и обычных пользователях).
      - **Структура:** Массив JSON-объектов, где каждый объект представляет собой пользователя:
        ```json
        [
          {
            "id": 1,
            "username": "admin1",
            "password": "admin1",
            "role": "admin",
            "last_login": "2024-12-29 18:25:47"
          },
          {
            "id": 2,
            "username": "user1",
            "password": "user1",
            "role": "user",
            "last_login": "2025-01-04 18:27:50"
          }
        ]
        ```
      - **Поля:**
        - `id`: Уникальный идентификатор пользователя.
        - `username`: Имя пользователя для входа.
        - `password`: Пароль пользователя.
        - `role`: Роль пользователя ("admin" или "user").
        - `last_login`: Дата последнего входа пользователя.

    - **`inventory.json`:**

      - **Назначение:** Хранит информацию о доступном инвентаре.
      - **Структура:** Массив JSON-объектов, где каждый объект представляет собой предмет инвентаря:
        ```json
        [
          {
            "id": 1,
            "name": "Спорт-обувь",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdvFZoLvLfzrOp8UKsbjkDl3_dh4S6OHAScg&s",
            "image_type": 2,
            "quantity": 10,
            "state": "новый",
            "price": 2999
          },
          {
            "id": 2,
            "name": "Футболка",
            "image": "2.jpeg",
            "image_type": 1,
            "quantity": 10,
            "state": "новый",
            "price": 999
          }
        ]
        ```
      - **Поля:**
        - `id`: Уникальный идентификатор предмета инвентаря.
        - `name`: Название предмета инвентаря.
        - `image`: URL изображения предмета инвентаря.
        - `image_type`: Тип изображения (0 - без изображения, 1 - из папки, 2 - по ссылке)
        - `quantity`: Общее количество данного предмета в наличии.
        - `state`: Текущее состояние предмета ("новый", "используется", "сломан").
        - `price`: Цена товара

    - **`inventory_assignments.json`:**

      - **Назначение:** Отслеживает, какой инвентарь и в каком количестве закреплен за каким пользователем.
      - **Структура:** Массив JSON-объектов, где каждый объект представляет собой назначение инвентаря:
        Пример реализации:
        ```json
        [
          {
            "id": 1,
            "user_id": 2,
            "inventory_id": 1,
            "quantity_assigned": 1,
            "assignment_date": "2024-01-02"
          },
          {
            "id": 2,
            "user_id": 3,
            "inventory_id": 2,
            "quantity_assigned": 5,
            "assignment_date": "2024-01-05"
          }
        ]
        ```
      - **Поля:**
        - `id`: Уникальный идентификатор назначения.
        - `user_id`: Идентификатор пользователя, за которым закреплен инвентарь.
        - `inventory_id`: Идентификатор предмета инвентаря.
        - `quantity_assigned`: Количество выданного инвентаря.
        - `assignment_date`: Дата назначения инвентаря.

    - **`purchase_plans.json`:**

      - **Назначение:** Хранит планы закупок нового инвентаря.
      - **Структура:** Массив JSON-объектов, где каждый объект представляет собой план закупки:
        Пример реализации:
        ```json
        [
          {
            "id": 1,
            "inventory_id": 2,
            "quantity": 10,
            "price": 150,
            "supplier": "Спортмастер"
          },
          {
            "id": 2,
            "inventory_id": 1,
            "quantity": 5,
            "price": 100,
            "supplier": "Декатлон"
          }
        ]
        ```
      - **Поля:**
        - `id`: Уникальный идентификатор плана закупки.
        - `inventory_id`: Идентификатор предмета инвентаря, который планируется закупить.
        - `quantity`: Планируемое количество для закупки.
        - `price`: Цена за единицу товара.
        - `supplier`: Название поставщика.

    - **`requests.json`:**

      - **Назначение:** Хранит информацию о заявках пользователей на получение, ремонт или замену инвентаря.
      - **Структура:** Массив JSON-объектов, где каждый объект представляет собой заявку:
        Пример реализации:
        ```json
        [
          {
            "id": 1,
            "user_id": 2,
            "inventory_id": 1,
            "quantity_requested": 1,
            "status": "pending",
            "request_type": "get",
            "request_date": "2024-01-02"
          },
          {
            "id": 2,
            "user_id": 3,
            "inventory_id": 2,
            "quantity_requested": 1,
            "status": "approved",
            "request_type": "repair",
            "request_date": "2024-01-05"
          }
        ]
        ```
      - **Поля:**
        - `id`: Уникальный идентификатор заявки.
        - `user_id`: Идентификатор пользователя, подавшего заявку.
        - `inventory_id`: Идентификатор предмета инвентаря, на который подана заявка.
        - `quantity_requested`: Запрашиваемое количество.
        - `status`: Статус заявки ("pending", "approved", "rejected").
        - `request_type`: Тип заявки ("get", "repair", "replace").
        - `request_date`: Дата подачи заявки.
        - `request_date`: Дата подачи заявки.

    - **`user_pages_settings.json`:**
      - **Назначение:** Хранит информацию о том какие страницы доступны пользователю и администратору, и в каком порядке их отображать.
      - **Структура:** JSON-объект со свойствами `admin` и `user`. Свойство `admin` и `user` - массив с JSON-объектами (страницами). У страниц есть свойство `name`, и свойство `subpages`, у `subpages` есть `name` и `order` (для сортировки)
        Пример реализации:
      ```json
      {
        "admin": [
          {
            "name": "inventory_management",
            "subpages": [
              {
                "name": "inventory_add_edit",
                "order": 1
              },
              {
                "name": "all_inventory",
                "order": 2
              }
            ]
          },
          {
            "name": "inventory_assignment",
            "subpages": [
              {
                "name": "inventory_assignment_create",
                "order": 1
              },
              {
                "name": "all_assignments",
                "order": 2
              }
            ]
          },
          {
            "name": "purchases_management",
            "subpages": [
              {
                "name": "purchases_add_edit",
                "order": 1
              },
              {
                "name": "all_purchase_plans",
                "order": 2
              }
            ]
          },
          {
            "name": "reports",
            "subpages": [
              {
                "name": "all_inventory",
                "order": 1
              },
              {
                "name": "all_assignments_and_purchases",
                "order": 2
              }
            ]
          },
          {
            "name": "requests",
            "subpages": []
          }
        ],
        "user": [
          {
            "name": "inventory",
            "subpages": []
          },
          {
            "name": "requests",
            "subpages": []
          }
        ]
      }
      ```
      - **Поля:**
        - `admin`: массив объектов, с подстраницами для администратора.
        - `user`: массив объектов, с подстраницами для пользователя.
        - `name`: Название страницы.
        - `subpages`: массив объектов с подподстраницами
        - `name`: Название подподстраницы
        - `order`: порядок отображения

3.  **Разработка:**

    - **Создание Flask приложения:**
      - Настройка структуры проекта (основные каталоги созданы).
      - Определение маршрутов (URL) для различных страниц и функций (реализовано частично).
    - **Реализация функций для работы с JSON:**
      - Функции для чтения JSON-файлов (реализовано частично для всех файлов).
      - Функции для записи в JSON-файлы (реализовано частично для всех файлов).
    - **Реализация функций авторизации/регистрации:**
      - Проверка наличия пользователя в `users.json` (реализовано при авторизации и регистрации).
      - Сравнение введенных данных с данными в JSON-файле (реализовано при авторизации и регистрации).
      - Реализована базовая проверка существования пользователя при регистрации.
      - Реализована анимация и динамика формы регистрации.
    - **Разработка HTML-шаблонов для интерфейса:**
      - Создание HTML-страниц для отображения данных и форм (базовые шаблоны созданы).
      - Реализована динамика и базовая стилизация страниц.
      - Создана структура для подстраниц.
      - Создана структура для подподстраниц.
      - Реализована динамическая подгрузка подстраниц и подподстраниц, на основе json файла.
    - **Реализация функциональности для администратора:**
      - Добавление, редактирование, удаление инвентаря в `inventory.json` (реализовано).
      - Закрепление инвентаря за пользователями в `inventory_assignments.json` (реализовано).
      - Планирование закупок в `purchase_plans.json` (реализовано).
      - Создание отчетов на основе данных из JSON (частично реализовано).
    - **Реализация функциональности для пользователя:**
      - Просмотр инвентаря из `inventory.json` (частично реализовано).
      - Подача заявок в `requests.json` (реализовано).
      - Отслеживание статуса заявок в `requests.json` (частично реализовано).
      - Создание заявок на ремонт/замену (дополнительно) в `requests.json` (реализовано).
      - Реализована система выбора типа изображения, и его вывод
    - Реализована система выбора состояния товара
    - **Использование Cookie:**
      - Сохранение сессии пользователя с помощью Cookie.
    - **Безопасность:**
    - Работа сайта по https, с использованием самоподписанного сертификата.
    - **Отсутствие кэширования:**
      - Полностью отключено кэширование браузера.
    - **Поддержка кириллицы:**
      - Полная поддержка кириллицы.
    - **Динамика:**
      - Реализована динамическая загрузка подстраниц и подподстраниц на основе JSON-файла
    - **Темы и язык:**
      - Реализована возможность менять тему сайта (светлая и темная), а так же язык (Русский и Английский)

4.  **Документация:**

    - Подготовка всех необходимых документов в соответствии с требованиями (в процессе).

5.  **Тестирование:**

    - Проверка работоспособности всех функций приложения (требуется реализация).

6.  **Деплой:**
    - Подготовка инструкции по развертыванию (реализация планируется в будещем).
    - Развертывание приложения на выбранном сервере (реализация планируется в будещем).

**3. Подробное описание этапов:**

1.  **Технологии:**
    - Flask – для backend-логики (используется).
    - HTML, CSS, JS для frontend (используются).
2.  **JSON:**
    - Использование стандартной библиотеки Python `json` (используется).
    - Файлы с описанной выше структурой (созданы).
3.  **Фронтенд:**
    - HTML - структура страниц (частично реализовано).
    - CSS - стилизация (частично реализована).
    - JS - динамика (частично реализована).
4.  **Разработка:**
    - Создание Flask приложения, маршрутов, функций (частично реализовано).
    - Реализация логики для каждого уровня доступа (админ, пользователь) (частично реализовано).
5.  **Авторизация:**
    - Чтение файла `users.json` для проверки данных (реализовано).
    - Сравнение введенных логина и пароля (реализовано).
    - Сохранение данных о последнем входе пользователя

**4. Шаги:**

- Создан репозиторий на GitHub.
- Создан Flask проект.
- Созданы JSON файлы.
- Разработаны функции для работы с JSON.
- Разработана авторизация/регистрация.
- Разработаны шаблоны страниц и функционал (частично реализовано).
- Отображение инвентаря на странице магазина и динамическая фильтрация (частично реализовано).
- Реализована работа с Cookie.
- Реализована работа с https.
- Реализовано полное отключение кэширования.
- Реализована система выбора типа изображения и вывода (частично реализовано).
- Реализована система выбора состояния товара (частично реализовано).
- Реализована динамическая загрузка страниц на основе json файла (частично реализовано).

**5. Дальнейшие шаги:**

1.  **Завершить обработку различных языков:**
    - Реализовать полную поддержку кириллицы.
2.  **Реализовать функциональность администратора:**
    - Разработать страницы для управления инвентарем (добавление, редактирование, удаление).
    - Реализовать функции для закрепления инвентаря за пользователями.
    - Разработать страницы для планирования закупок.
    - Реализовать создание отчетов по инвентарю.
3.  **Реализовать функциональность пользователя:**
    - Разработать механизм подачи заявок на инвентарь.
    - Разработать страницы для отслеживания статуса заявок.
    - Реализовать возможность подачи заявок на ремонт или замену инвентаря.
4.  **Разработка:**
    - Полностью реализовать динамическое создание подстраниц на странице dashboard
    - Реализовать изменение темы и языка сайта
    - Разработать все js файлы для всех подстраниц и подподстраниц
5.  **Тестирование:**
    - Провести полное тестирование всех функций.
6.  **Документация:**
    - Завершить оформление всей необходимой документации.
7.  **Деплой:**
    - Подготовить инструкцию и развернуть приложение (планируется в будущем).

Этот план отражает текущее состояние проекта и определяет следующие шаги для его завершения в соответствии с поставленными требованиями.

---

Вот так сейчас выглядит дерево проекта:

```
..\2098_predprov_comanda_15_case_5\
|---.gitignore
|---cert.pem
|---key.pem
|---main.py
|---Podrobnoye_opisaniye_kazhdogo_fayla_i_papki_v_proyekte.txt
|---README.md
|---soder_script.py
|---.git
|---.idea
|---.venv
|---data
|   |---inventory.json
|   |---inventory_assignments.json
|   |---purchase_plans.json
|   |---requests.json
|   |---users.json
|   `---user_pages_settings.json
|---resources
|   `---Komandnyy keys 5 Upravleniye sportivnym inventarem.pdf
|---static
|   |---css
|   |   |---auth.css
|   |   |---base.css
|   |   |---dashboard.css
|   |   |---dashboard_elements.css
|   |   `---magazine.css
|   |---fonts
|   |   |---COPYRIGHT.txt
|   |   `---GOST_Type_A.ttf
|   |---images
|   |   |---10.jpeg
|   |   |---2.jpeg
|   |   |---5.jpeg
|   |   |---7.jpeg
|   |   |---8.jpeg
|   |   |---9.jpeg
|   |   `---no_image.png
|   `---js
|       |---authorization__sign_in.js
|       |---cart_and_filter.js
|       |---dashboard.js
|       |---dashboard_main.js
|       |---dashboard_menu.js
|       |---register__sign_up.js
|       |---requests.js
|       |---dashboard_subpage
|       |   `---utils.js
|       `---dashboard_subsubpage
|           |---inventory_assignment
|           |   |---all_assignments.js
|           |   `---inventory_assignment_create.js
|           |---inventory_management
|           |   |---all_inventory.js
|           |   `---inventory_add_edit.js
|           |---purchases_management
|           |   |---all_purchase_plans.js
|           |   `---purchases_add_edit.js
|           |---reports
|           |   |---all_assignments.js
|           |   |---all_inventory.js
|           |   `---all_purchases.js
|           `---requests
|               |---all_requests.js
|               `---request_create.js
`---templates
    |---404.html
    |---admin_error.html
    |---base.html
    |---register__sign_up.html
    |---sign_in.html
    |---user_error.html
    |---dashboard
    |   |---dashboard.html
    |   `---main_dashboard.html
    |---dashboard_subpage
    |   |---inventory_assignment.html
    |   |---inventory_management.html
    |   |---purchases_management.html
    |   |---reports.html
    |   `---requests.html
    `---dashboard_subsubpage
        |---inventory_assignment
        |   |---all_assignments.html
        |   `---inventory_assignment_create.html
        |---inventory_management
        |   |---all_inventory.html
        |   `---inventory_add_edit.html
        |---purchases_management
        |   |---all_purchase_plans.html
        |   `---purchases_add_edit.html
        |---reports
        |   |---all_assignments.html
        |   |---all_inventory.html
        |   `---all_purchases.html
        `---requests
            |---all_requests.html
            `---request_create.html
```
