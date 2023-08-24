from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ('tel', 'name', 'message', 'date_sent')
admin.site.register(Contact, ContactAdmin)

