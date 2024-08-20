from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('cv/', views.cv_view, name='cv'),
    path('contact/', views.contact_view, name='contact'),
    path('school-projects/', views.school_projects_view, name='school_projects'),
    path('hackathon-projects/', views.hackathon_projects_view, name='hackathon_projects'),
]