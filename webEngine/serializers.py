from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Conversation, Message


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


class ConversationSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['user']


class MessageSerializer(serializers.ModelSerializer):
    from_who = UserSerializer(many=False)
    conversation = ConversationSerializer(many=False)

    class Meta:
        model = Message
        fields = ['from_who', 'conversation', 'message_content', 'send_time']
