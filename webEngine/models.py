from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='info')
    image = models.ImageField(upload_to='users', blank=True)


class Conversation(models.Model):
    user = models.ManyToManyField(User, related_name='conversation')

    def __str__(self):
        fin_str = ""
        plus_str = " + "
        for user in self.user.all():
            if fin_str == "":
                fin_str = fin_str + user.username
            else:
                fin_str = fin_str + plus_str + user.username

        return fin_str


class Message(models.Model):
    from_who = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    message_content = models.TextField(blank=False, max_length=1500)
    send_time = models.DateTimeField(blank=False, auto_now_add=True)
