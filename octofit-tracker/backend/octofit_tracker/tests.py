from django.test import SimpleTestCase
from django.urls import reverse


class ApiRouteTests(SimpleTestCase):
    def test_api_root_route_exists(self):
        response = self.client.get(reverse("api-root"))
        self.assertEqual(response.status_code, 200)

    def test_site_root_points_to_api(self):
        response = self.client.get(reverse("site-root"))
        self.assertEqual(response.status_code, 200)