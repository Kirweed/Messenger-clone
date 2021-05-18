from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from .serializers import UserSerializer, ConversationSerializer, MessageSerializer
from django.contrib.auth.models import User
from . models import Conversation, Message

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


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


@login_required
def messenger_main_view(request):
    return render(request, 'index.html')


def logout_view(request):
    logout(request)
    return redirect(main_page_render)
