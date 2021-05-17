from django.shortcuts import render

# Create your views here.


def main_page_render(request):
    return render(request, 'main_page.html')

