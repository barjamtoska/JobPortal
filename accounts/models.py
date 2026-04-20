from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra):
        if not email:
            raise ValueError('Email është i detyrueshëm')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra):
        extra.setdefault('is_staff', True)
        extra.setdefault('is_superuser', True)
        extra.setdefault('role', 'admin')
        return self.create_user(email, password, **extra)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('candidate', 'Kandidat'),
        ('employer',  'Punëdhënës'),
        ('admin',     'Admin'),
    ]

    email       = models.EmailField(unique=True)
    first_name  = models.CharField(max_length=60, blank=True)
    last_name   = models.CharField(max_length=60, blank=True)
    role        = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name        = 'Përdorues'
        verbose_name_plural = 'Përdoruesit'

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'.strip() or self.email

    @property
    def is_candidate(self):
        return self.role == 'candidate'

    @property
    def is_employer(self):
        return self.role == 'employer'


class CandidateProfile(models.Model):
    user   = models.OneToOneField(User, on_delete=models.CASCADE, related_name='candidate_profile')
    title  = models.CharField(max_length=120, blank=True)
    bio    = models.TextField(blank=True)
    phone  = models.CharField(max_length=20, blank=True)
    city   = models.CharField(max_length=60, blank=True)
    cv     = models.FileField(upload_to='cvs/', null=True, blank=True)
    skills = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f'Profili i {self.user.full_name}'


class EmployerProfile(models.Model):
    user         = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employer_profile')
    company_name = models.CharField(max_length=120)
    industry     = models.CharField(max_length=80, blank=True)
    company_size = models.CharField(max_length=40, blank=True)
    website      = models.URLField(blank=True)
    description  = models.TextField(blank=True)
    phone        = models.CharField(max_length=20, blank=True)
    city         = models.CharField(max_length=60, blank=True)
    is_verified  = models.BooleanField(default=False)

    def __str__(self):
        return self.company_name