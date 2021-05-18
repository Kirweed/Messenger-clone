from django.contrib import admin
from .models import UserInfo, Conversation, Message

# Register your models here.

admin.site.register(UserInfo)
admin.site.register(Conversation)
admin.site.register(Message)
