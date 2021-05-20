from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Conversation, Message, UserInfo


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['image',]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    info = UserInfoSerializer(many=False)
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'info']


class MessageSerializer(serializers.ModelSerializer):
    from_who = UserSerializer(many=False)

    class Meta:
        model = Message
        fields = ['from_who', 'message_content', 'send_time']


class ConversationSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)
    messages = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['user', 'messages']