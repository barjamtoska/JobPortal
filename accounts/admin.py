from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, CandidateProfile, EmployerProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display   = ['email', 'full_name', 'role', 'is_active', 'date_joined']
    list_filter    = ['role', 'is_active']
    search_fields  = ['email', 'first_name', 'last_name']
    ordering       = ['-date_joined']
    fieldsets = (
        (None,          {'fields': ('email', 'password')}),
        ('Informacion', {'fields': ('first_name', 'last_name', 'role')}),
        ('Lejet',       {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {'classes': ('wide',), 'fields': ('email', 'password1', 'password2', 'role')}),
    )


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'title', 'city']
    search_fields = ['user__email', 'title']


@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display  = ['company_name', 'industry', 'is_verified']
    list_filter   = ['is_verified']
    search_fields = ['company_name']