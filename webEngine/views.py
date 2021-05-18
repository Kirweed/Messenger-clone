from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.


def main_page_render(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect(messenger_main_view)
        else:
            return render(request, 'main_page.html')
    else:
        return render(request, 'main_page.html')


def messenger_main_view(request):

    return render(request, 'index.html')
