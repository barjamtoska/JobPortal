from django.contrib import admin
from django.urls import path, include
from jobs import views as job_views
from accounts import views as acc_views
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',       job_views.index,   name='index'),
    path('jobs/',  include('jobs.urls')),
    path('',          include('accounts.urls')),
    path('about/',    TemplateView.as_view(template_name='about.html'),   name='about'),
    path('contact/', acc_views.contact_view, name='contact'),
    path('terms/', TemplateView.as_view(template_name='terms.html'), name='terms'),
] + static (settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)