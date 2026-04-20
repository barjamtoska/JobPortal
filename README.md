# JobPortal

A full-stack job portal web application built with Django, targeting the Albanian job market. The platform connects job seekers with employers through an intelligent matching system powered by NLP and sentence embeddings.

---

## Features

### For Candidates
- Register and build a profile
- Browse and search job listings with advanced multi-select filtering
- Apply to jobs directly through the platform
- Save jobs for later review
- Track application status from a personal dashboard

### For Employers
- Post, edit, and close job listings
- Review and manage incoming applications
- Access an employer dashboard with posting analytics

### For Admins
- Full admin panel for user and content management
- Role-based access control

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, Django |
| Frontend | HTML, CSS, JavaScript |
| Database | SQLite (development) |
| Email | Gmail SMTP |
| Auth | Custom User model (email-based) |

---

## Project Structure

```
JobPortal/
├── manage.py
├── jobportal/          # Project settings & URLs
├── jobs/               # Job listings, applications, matching logic
├── users/              # Custom user model, profiles, authentication
├── templates/          # HTML templates
├── static/             # CSS, JS, fonts
└── requirements.txt
```

---

## Getting Started

### Prerequisites
- Python 3.10+
- pip

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/JobPortal.git
cd JobPortal

# 2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply migrations
python manage.py migrate

# 5. Create a superuser (admin)
python manage.py createsuperuser

# 6. Run the development server
python manage.py runserver
```

Then open your browser at `http://127.0.0.1:8000`

---

## Environment Variables

Create a `.env` file in the project root (this file is excluded from version control):

```
SECRET_KEY=your_django_secret_key
DEBUG=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
```

---

## User Roles

| Role | Capabilities |
|------|-------------|
| Candidate | Browse jobs, apply, save, dashboard |
| Employer | Post jobs, manage applications, dashboard |
| Admin | Full site management |

---

## UI & Design

- Language: Albanian (Shqip)
- Fonts: Syne (headings, 800w) · Plus Jakarta Sans (body)
- Design system built on CSS custom properties (navy, green, cream tones)
- Mobile responsive with hamburger menu and slide-in filter drawer
- Shared navbar/footer injected via centralized JavaScript component system

---

## License

This project is developed for academic purposes.

---
