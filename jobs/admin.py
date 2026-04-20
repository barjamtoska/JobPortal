from django.contrib import admin
from .models import Job, Application


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display  = ['title', 'employer_company', 'category', 'location', 'is_active', 'created_at']
    list_filter   = ['category', 'contract_type', 'location', 'is_active']
    search_fields = ['title']
    list_editable = ['is_active']

    def employer_company(self, obj):
        return obj.employer_company
    employer_company.short_description = 'Kompania'


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display  = ['candidate', 'job', 'status', 'applied_at']
    list_filter   = ['status']
    list_editable = ['status']