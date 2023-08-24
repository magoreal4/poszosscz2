from rest_framework import serializers

from mapa.models import Cliente

class ClienteGet(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
            'id',
            'lat',
            'lon',
            'cost',
            'status',
            'user',
            'tel1'
        )

class ClientePost(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        # fields = ('__all__')
        fields = (
            'id',
            'name',
            'tel1',
            'cost',
            'lat',
            'lon',
            'status',
            'user'
        )