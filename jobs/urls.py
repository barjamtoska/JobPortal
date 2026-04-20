from django.urls import path
from . import views

urlpatterns = [
    path('',                                views.job_list,                  name='job_list'),
    path('post/',                           views.post_job,                  name='post_job'),
    path('<int:pk>/',                       views.job_detail,                name='job_detail'),
    path('<int:pk>/edit/',                  views.edit_job,                  name='edit_job'),
    path('<int:pk>/close/',                 views.close_job,                 name='close_job'),
    path('<int:pk>/apply/',                 views.apply_job,                 name='apply_job'),
    path('<int:pk>/applications/',          views.job_applications,          name='job_applications'),
    path('application/<int:pk>/status/',   views.update_application_status, name='update_application_status'),
    path('<int:pk>/save/', views.toggle_save_job, name='toggle_save'),
    path('application/<int:pk>/remove/', views.remove_application, name='remove_application'),
]