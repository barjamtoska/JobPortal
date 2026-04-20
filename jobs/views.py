from django.shortcuts import redirect, render
from .models import Application, Job
from django.db.models import Count


def index(request):

    recent_jobs = Job.objects.filter(is_active=True).order_by('-created_at')[:4]

    # Numri i punëve për çdo kategori
    category_counts = dict(
        Job.objects.filter(is_active=True)
        .values_list('category')
        .annotate(count=Count('id'))
        .values_list('category', 'count')
    )

    categories_with_counts = [
        {'val': val, 'label': label, 'count': category_counts.get(val, 0)}
        for val, label in Job.CATEGORY_CHOICES
        if category_counts.get(val, 0) > 0
    ]

    context = {
        'recent_jobs':            recent_jobs,
        'total_jobs':             Job.objects.filter(is_active=True).count(),
        'categories':             Job.CATEGORY_CHOICES,
        'cities':                 Job.CITY_CHOICES,
        'categories_with_counts': categories_with_counts,
        'partners': [
    ('Alpha Bank', '🏦'), ('Vodafone', '📡'), ('Credins Bank', '💳'), ('Raiffeisen Bank', '🏦'),
],
    }
    return render(request, 'jobs/index.html', context)


def job_list(request):
    from django.db.models import Q
    from django.core.paginator import Paginator

    jobs = Job.objects.filter(is_active=True)

    q            = request.GET.get('q', '').strip()
    sort         = request.GET.get('sort', 'recent')
    salary_min   = request.GET.get('salary_min', '')
    salary_max   = request.GET.get('salary_max', '')

    # Mbështet si vlerë të vetme (nga hero) ashtu edhe lista (nga sidebar)
    categories_sel  = request.GET.getlist('category')
    locations_sel   = request.GET.getlist('location')
    contracts_sel   = request.GET.getlist('contract')
    experiences_sel = request.GET.getlist('experience')

    if q:
        jobs = jobs.filter(Q(title__icontains=q) | Q(description__icontains=q))
    if categories_sel:
        jobs = jobs.filter(category__in=categories_sel)
    if locations_sel:
        jobs = jobs.filter(location__in=locations_sel)
    if contracts_sel:
        jobs = jobs.filter(contract_type__in=contracts_sel)
    if experiences_sel:
        jobs = jobs.filter(experience__in=experiences_sel)
    if salary_min:
        jobs = jobs.filter(salary_max__gte=int(salary_min))
    if salary_max:
        jobs = jobs.filter(salary_min__lte=int(salary_max))

    if sort == 'salary':
        jobs = jobs.order_by('-salary_max')
    elif sort == 'relevant':
        jobs = jobs.order_by('-is_featured', '-created_at')
    else:
        jobs = jobs.order_by('-created_at')

    paginator = Paginator(jobs, 8)
    page_obj  = paginator.get_page(request.GET.get('page', 1))

    context = {
        'page_obj':       page_obj,
        'total':          jobs.count(),
        'q':              q,
        'sort':           sort,
        'salary_min':     salary_min,
        'salary_max':     salary_max,
        'categories_sel': categories_sel,
        'locations_sel':  locations_sel,
        'contracts_sel':  contracts_sel,
        'experiences_sel':experiences_sel,
        'categories':     Job.CATEGORY_CHOICES,
        'contracts':      Job.CONTRACT_CHOICES,
        'experiences':    Job.EXPERIENCE_CHOICES,
        'cities':         Job.CITY_CHOICES,
    }
    return render(request, 'jobs/list.html', context)


def job_detail(request, pk):
    from django.shortcuts import get_object_or_404
    job          = get_object_or_404(Job, pk=pk)
    similar_jobs = Job.objects.filter(category=job.category, is_active=True).exclude(pk=pk)[:3]
    context = {
        'job':          job,
        'similar_jobs': similar_jobs,
    }
    return render(request, 'jobs/detail.html', context)

from django.contrib.auth.decorators import login_required
from django.contrib import messages

@login_required
def post_job(request):
    if not request.user.is_employer:
        messages.error(request, 'Vetëm punëdhënësit mund të postojnë punë.')
        return redirect('index')

    if request.method == 'POST':
        title        = request.POST.get('title', '').strip()
        description  = request.POST.get('description', '').strip()
        requirements = request.POST.get('requirements', '').strip()
        benefits     = request.POST.get('benefits', '').strip()
        category     = request.POST.get('category', '')
        contract     = request.POST.get('contract_type', '')
        experience   = request.POST.get('experience', '')
        location     = request.POST.get('location', '')
        salary_min   = request.POST.get('salary_min', '') or None
        salary_max   = request.POST.get('salary_max', '') or None
        deadline     = request.POST.get('deadline', '') or None
        is_remote    = request.POST.get('is_remote') == 'on'
        is_urgent    = request.POST.get('is_urgent') == 'on'

        if not title or not description or not category or not location:
            return render(request, 'jobs/post_job.html', {
                'error':       'Plotëso të gjitha fushat e detyrueshme.',
                'categories':  Job.CATEGORY_CHOICES,
                'contracts':   Job.CONTRACT_CHOICES,
                'experiences': Job.EXPERIENCE_CHOICES,
                'cities':      Job.CITY_CHOICES,
            })

        job = Job.objects.create(
            employer=request.user,
            title=title,
            description=description,
            requirements=requirements,
            benefits=benefits,
            category=category,
            contract_type=contract,
            experience=experience,
            location=location,
            salary_min=salary_min,
            salary_max=salary_max,
            deadline=deadline,
            is_remote=is_remote,
            is_urgent=is_urgent,
        )
        messages.success(request, f'Vendi i punës "{job.title}" u publikua me sukses!')
        return redirect('dashboard')

    return render(request, 'jobs/post_job.html', {
        'categories':  Job.CATEGORY_CHOICES,
        'contracts':   Job.CONTRACT_CHOICES,
        'experiences': Job.EXPERIENCE_CHOICES,
        'cities':      Job.CITY_CHOICES,
    })
@login_required
def edit_job(request, pk):
    from django.shortcuts import get_object_or_404
    job = get_object_or_404(Job, pk=pk, employer=request.user)

    if request.method == 'POST':
        job.title        = request.POST.get('title', '').strip()
        job.description  = request.POST.get('description', '').strip()
        job.requirements = request.POST.get('requirements', '').strip()
        job.benefits     = request.POST.get('benefits', '').strip()
        job.category     = request.POST.get('category', '')
        job.contract_type= request.POST.get('contract_type', '')
        job.experience   = request.POST.get('experience', '')
        job.location     = request.POST.get('location', '')
        job.salary_min   = request.POST.get('salary_min') or None
        job.salary_max   = request.POST.get('salary_max') or None
        job.deadline     = request.POST.get('deadline') or None
        job.is_remote    = request.POST.get('is_remote') == 'on'
        job.is_urgent    = request.POST.get('is_urgent') == 'on'
        job.save()
        messages.success(request, f'"{job.title}" u përditësua me sukses!')
        return redirect('dashboard')

    return render(request, 'jobs/edit_job.html', {
        'job':         job,
        'categories':  Job.CATEGORY_CHOICES,
        'contracts':   Job.CONTRACT_CHOICES,
        'experiences': Job.EXPERIENCE_CHOICES,
        'cities':      Job.CITY_CHOICES,
    })


@login_required
def close_job(request, pk):
    from django.shortcuts import get_object_or_404
    job = get_object_or_404(Job, pk=pk, employer=request.user)
    job.is_active = False
    job.save()
    messages.success(request, f'"{job.title}" u mbyll.')
    return redirect('dashboard')

@login_required
def apply_job(request, pk):
    from django.shortcuts import get_object_or_404
    job = get_object_or_404(Job, pk=pk, is_active=True)

    if not request.user.is_candidate:
        messages.error(request, 'Vetëm kandidatët mund të aplikojnë.')
        return redirect('job_detail', pk=pk)

    if Application.objects.filter(job=job, candidate=request.user).exists():
        messages.warning(request, 'Ke aplikuar tashmë për këtë punë.')
        return redirect('job_detail', pk=pk)

    if request.method == 'POST':
        cover_note = request.POST.get('cover_note', '').strip()
        cv         = request.FILES.get('cv')
        if not cv:
            messages.error(request, 'Ju lutem ngarkoni CV-në tuaj.')
            return redirect('job_detail', pk=pk)

        Application.objects.create(
            job=job,
            candidate=request.user,
            cover_note=cover_note,
            cv=cv,
        )
        messages.success(request, f'Aplikimi për "{job.title}" u dërgua me sukses! 🎉')
        return redirect('dashboard')

    return redirect('job_detail', pk=pk)

@login_required
def job_applications(request, pk):
    from django.shortcuts import get_object_or_404
    from django.views.decorators.cache import never_cache
    job = get_object_or_404(Job, pk=pk, employer=request.user)
    applications = Application.objects.filter(job=job).select_related('candidate').order_by('-applied_at')
    response = render(request, 'jobs/applications.html', {
        'job':          job,
        'applications': applications,
    })
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response


@login_required
def update_application_status(request, pk):
    from django.shortcuts import get_object_or_404
    from django.http import HttpResponseRedirect
    from django.urls import reverse
    
    app    = get_object_or_404(Application, pk=pk, job__employer=request.user)
    status = request.POST.get('status')
    if status in ['new', 'review', 'interview', 'accepted', 'rejected']:
        app.status = status
        app.save()
        messages.success(request, f'Statusi u ndryshua në "{app.get_status_display()}".')
    
    response = HttpResponseRedirect(reverse('job_applications', args=[app.job.pk]))
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response

@login_required
def toggle_save_job(request, pk):
    from django.shortcuts import get_object_or_404
    from django.http import JsonResponse
    job  = get_object_or_404(Job, pk=pk)
    user = request.user
    if user in job.saved_by.all():
        job.saved_by.remove(user)
        saved = False
    else:
        job.saved_by.add(user)
        saved = True
    return JsonResponse({'saved': saved})

@login_required
def remove_application(request, pk):
    from django.shortcuts import get_object_or_404
    app = get_object_or_404(Application, pk=pk, candidate=request.user)
    app.delete()
    messages.success(request, 'Aplikimi u hoq nga lista.')
    return redirect('dashboard')