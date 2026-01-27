from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Fighter
from .serializers import FighterSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class FighterListView(generics.ListAPIView):
    serializer_class = FighterSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        qs = Fighter.objects.all()
        q = self.request.query_params.get('search')
        if q:
            qs = qs.filter(name__icontains=q)
        return qs


class FighterDetailView(generics.RetrieveAPIView):
    queryset = Fighter.objects.all()
    serializer_class = FighterSerializer
