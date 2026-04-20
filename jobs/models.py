from django.db import models
from django.conf import settings
from django.utils import timezone


class Job(models.Model):
    CATEGORY_CHOICES = [
        ('IT',          'IT & Teknologji'),
        ('Marketing',   'Marketing & Shitje'),
        ('Finance',     'Financë & Kontabilitet'),
        ('Admin',       'Administratë'),
        ('Engineering', 'Inxhinieri'),
        ('Health',      'Shëndetësi'),
        ('Design',      'Dizajn & Kreativ'),
        ('Legal',       'Juridik'),
        ('Education',   'Arsim & Trajnim'),
        ('Other',       'Të Tjera'),
    ]
    CONTRACT_CHOICES = [
        ('Full-time',  'Full-time'),
        ('Part-time',  'Part-time'),
        ('Freelance',  'Freelance / Projekt'),
        ('Internship', 'Praktikë'),
    ]
    EXPERIENCE_CHOICES = [
        ('Entry',   'Entry Level'),
        ('Junior',  'Junior (0–2 vjet)'),
        ('Mid',     'Mid-level (2–5 vjet)'),
        ('Senior',  'Senior (5+ vjet)'),
        ('Manager', 'Menaxher'),
    ]
    CITY_CHOICES = [
        ('Tiranë',  'Tiranë'),
        ('Durrës',  'Durrës'),
        ('Vlorë',   'Vlorë'),
        ('Shkodër', 'Shkodër'),
        ('Elbasan', 'Elbasan'),
        ('Fier',    'Fier'),
        ('Remote',  'Remote'),
    ]

    employer      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='jobs')
    title         = models.CharField(max_length=160)
    description   = models.TextField()
    requirements  = models.TextField(blank=True)
    benefits      = models.TextField(blank=True)
    category      = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    contract_type = models.CharField(max_length=20, choices=CONTRACT_CHOICES, default='Full-time')
    experience    = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES, default='Mid')
    location      = models.CharField(max_length=60, choices=CITY_CHOICES)
    is_remote     = models.BooleanField(default=False)
    salary_min    = models.PositiveIntegerField(null=True, blank=True)
    salary_max    = models.PositiveIntegerField(null=True, blank=True)
    is_active     = models.BooleanField(default=True)
    is_featured   = models.BooleanField(default=False)
    is_urgent     = models.BooleanField(default=False)
    deadline      = models.DateField(null=True, blank=True)
    created_at    = models.DateTimeField(default=timezone.now)
    updated_at    = models.DateTimeField(auto_now=True)
    saved_by      = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='saved_jobs', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def employer_company(self):
        try:
            return self.employer.employer_profile.company_name
        except Exception:
            return self.employer.email

    @property
    def days_ago(self):
        return (timezone.now().date() - self.created_at.date()).days

    @property
    def salary_display(self):
        if self.salary_min and self.salary_max:
            return f'{self.salary_min:,} – {self.salary_max:,} ALL/muaj'
        return 'E negociueshme'


class Application(models.Model):
    STATUS_CHOICES = [
        ('new',       'I Ri'),
        ('review',    'Në shqyrtim'),
        ('interview', 'Intervistë'),
        ('accepted',  'Pranuar'),
        ('rejected',  'Refuzuar'),
    ]

    job        = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    candidate  = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    cv         = models.FileField(upload_to='applications/', null=True, blank=True)
    cover_note = models.TextField(blank=True)
    status     = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    applied_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering        = ['-applied_at']
        unique_together = [['job', 'candidate']]

    def __str__(self):
        return f'{self.candidate.email} → {self.job.title}'