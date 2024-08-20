from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import SchoolProject, HackathonProject

def home_view(request):
    return render(request, 'home.html')

def about_view(request):
    return render(request, 'about.html')

def cv_view(request):
    return render(request, 'cv.html')

def contact_view(request):
    return render(request, 'contact.html')

def school_projects_view(request):
    projects = SchoolProject.objects.all()
    return render(request, 'school_projects.html', {'projects': projects})

def hackathon_projects_view(request):
    projects = HackathonProject.objects.all()
    return render(request, 'hackathon_projects.html', {'projects': projects})
