from django.contrib import admin
from .models import Cliente
from import_export import resources
from import_export.admin import ImportExportModelAdmin

class ClienteAdmin(ImportExportModelAdmin):
    list_display = (
        'id',
        'tel1', 
        'tel2', 
        'name', 
        'address',
        'cod', 
        'cost', 
        'service', 
        'status', 
        'user',
        'coordenadas', 
        'format_created_at', 
        'format_updated_at'
        )
    def coordenadas(self, obj):
        return str(obj.lat)+","+str(obj.lon)
    
    def format_updated_at(self, obj):
        return obj.updated_at.strftime('%d-%m-%Y, %H:%M')   
    format_updated_at.admin_order_field = 'updated_at'
    format_updated_at.short_description = 'Actualizado'
    
    def format_created_at(self, obj):
        return obj.created_at.strftime('%d-%m-%Y, %H:%M')   
    format_created_at.admin_order_field = 'created_at'
    format_created_at.short_description = 'Creado'
    
    list_display_links = ('id', )
    search_fields = ('tel1', 'name')
    # list_filter = ('status', 'service')
    list_editable = ('tel1', 'tel2', 'name', 'cost', 'cod', 'status', 'user')
    
    # formfield_overrides = {
    #     models.CharField: {'widget': TextInput(attrs={'size':'8'})},
    # }
    class Media:
        css = {
            'all': ('css/admin-mapa.css',)
            } 

admin.site.register(Cliente, ClienteAdmin)

# Clase para la importacion y exportacion de archivos
class ClienteResource(resources.ModelResource):
    fields = (
        'tel1',
        'tel2',
        'name',
        'address',
        'cod',
        'cost',
        'service',       
        'lat',
        'lon',
        'status',
        'created_at'
    )
    class Meta:
        model = Cliente

