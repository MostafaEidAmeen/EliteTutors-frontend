import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, UserPlus, Settings } from 'lucide-react';
import { apiClient } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getManagerStats();
      setStats(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading dashboard: {error}</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Managers',
      value: stats?.total_managers || 0,
      description: 'All registered managers',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Managers',
      value: stats?.active_managers || 0,
      description: 'Currently active managers',
      icon: UserCheck,
      color: 'text-green-600',
    },
    {
      title: 'Inactive Managers',
      value: stats?.inactive_managers || 0,
      description: 'Deactivated managers',
      icon: UserX,
      color: 'text-red-600',
    },
    {
      title: 'Recent Additions',
      value: stats?.recent_managers || 0,
      description: 'Added in last 30 days',
      icon: UserPlus,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Role Distribution */}
      {stats?.role_stats && (
        <Card>
          <CardHeader>
            <CardTitle>Manager Roles</CardTitle>
            <CardDescription>
              Distribution of managers by role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.role_stats).map(([role, count]) => (
                <Badge key={role} variant="secondary" className="text-sm">
                  {role}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="/managers"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium">Manage Managers</h3>
                <p className="text-sm text-gray-600">View and edit manager accounts</p>
              </div>
            </a>
            
            <a
              href="/managers?action=add"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UserPlus className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium">Add Manager</h3>
                <p className="text-sm text-gray-600">Create new manager account</p>
              </div>
            </a>
            
            <a
              href="/settings"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium">System Settings</h3>
                <p className="text-sm text-gray-600">Configure system preferences</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system health and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">API Status</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Database</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-gray-600">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

