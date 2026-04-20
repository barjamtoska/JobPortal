from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import get_user_model
from jobs.models import Job, Application

User = get_user_model()


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    tab = request.GET.get('tab', 'login')
    error = ''

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'login':
            email    = request.POST.get('email', '').strip()
            password = request.POST.get('password', '')
            user     = authenticate(request, username=email, password=password)
            if user:
                login(request, user)
                return redirect(request.GET.get('next', 'dashboard'))
            else:
                error = 'Email ose fjalëkalim i gabuar.'
                tab   = 'login'

        elif action == 'register_candidate':
            email    = request.POST.get('email', '').strip()
            password = request.POST.get('password', '')
            fn       = request.POST.get('first_name', '').strip()
            ln       = request.POST.get('last_name', '').strip()
            title    = request.POST.get('title', '').strip()

            if User.objects.filter(email=email).exists():
                error = 'Ky email është regjistruar tashmë.'
                tab   = 'register'
            elif len(password) < 8:
                error = 'Fjalëkalimi duhet të ketë minimum 8 karaktere.'
                tab   = 'register'
            else:
                user = User.objects.create_user(
                    email=email, password=password,
                    first_name=fn, last_name=ln, role='candidate'
                )
                from accounts.models import CandidateProfile
                CandidateProfile.objects.create(user=user, title=title)
                login(request, user)
                return redirect('dashboard')

        elif action == 'register_employer':
            email        = request.POST.get('email', '').strip()
            password     = request.POST.get('password', '')
            company_name = request.POST.get('company_name', '').strip()
            industry     = request.POST.get('industry', '').strip()
            company_size = request.POST.get('company_size', '').strip()

            if User.objects.filter(email=email).exists():
                error = 'Ky email është regjistruar tashmë.'
                tab   = 'register'
            elif len(password) < 8:
                error = 'Fjalëkalimi duhet të ketë minimum 8 karaktere.'
                tab   = 'register'
            else:
                user = User.objects.create_user(
                    email=email, password=password, role='employer'
                )
                from accounts.models import EmployerProfile
                EmployerProfile.objects.create(
                    user=user, company_name=company_name,
                    industry=industry, company_size=company_size
                )
                login(request, user)
                return redirect('dashboard')

    return render(request, 'accounts/login.html', {
        'tab':   tab,
        'error': error,
    })


def logout_view(request):
    logout(request)
    return redirect('index')


@login_required
def dashboard_view(request):
    user = request.user

    if user.is_candidate:
        applications = Application.objects.filter(
            candidate=user
        ).select_related('job').order_by('-applied_at')
        
        saved_jobs = Job.objects.filter(saved_by=user, is_active=True)
        
        return render(request, 'accounts/dashboard.html', {
            'user':         user,
            'applications': applications,
            'saved_jobs':   saved_jobs,
        })

    elif user.is_employer or user.is_staff:
        jobs = Job.objects.filter(employer=user).order_by('-created_at')
        return render(request, 'accounts/dashboard.html', {
            'user': user,
            'jobs': jobs,
        })

    return render(request, 'accounts/dashboard.html', {'user': user})
def contact_view(request):
    contact_success = False
    if request.method == 'POST':
        name    = request.POST.get('name', '').strip()
        email   = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        try:
            from django.core.mail import send_mail
            from django.conf import settings

            send_mail(
                subject=f'JobPortal Kontakt: {subject}',
                message=f'Nga: {name} <{email}>\n\nMesazhi:\n{message}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            contact_success = True
        except Exception as e:
            print(f'Email error: {e}')
            contact_success = True  # Shfaq sukses edhe nëse ka problem

    return render(request, 'contact.html', {'contact_success': contact_success})

@login_required
def update_logo(request):
    print(f"Method: {request.method}")
    print(f"FILES: {request.FILES}")
    if request.method == 'POST':
        print(f"Logo file: {request.FILES.get('logo')}")
        logo = request.FILES.get('logo')
        if logo:
            try:
                profile = request.user.employer_profile
                profile.logo = logo
                profile.save()
                print(f"Logo saved: {profile.logo}")
                messages.success(request, 'Logoja u ndryshua me sukses!')
            except Exception as e:
                print(f"Error: {e}")
                messages.error(request, f'Gabim: {e}')
        else:
            print("No logo file in request")
    return redirect('dashboard')