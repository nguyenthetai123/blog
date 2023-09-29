from .models import *
from rest_framework import serializers

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields= '__all__'
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)
    # comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


    # def get_comments(self, obj):
    #     comments = obj.comment_set.all()
    #     serializer = CommentSerializer(comments, many=True)
    #     return serializer.data