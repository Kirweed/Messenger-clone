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


class MessageMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['from_who', 'message_content', 'send_time', 'conversation']


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)
    user = UserSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['id', 'messages', 'user']


class UserConversationSerializer(serializers.ModelSerializer):
    conversation = ConversationSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'conversation']
