from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ('id',  'email', )
    list_display_links = ('id', 'email', )
    search_fields = ( 'email', )
    list_per_page = 25


admin.site.register(User, UserAdmin)