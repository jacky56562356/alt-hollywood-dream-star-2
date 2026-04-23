import React, { createContext, useState, useContext } from 'react';
import { ACTORS, RESOURCES, OPPORTUNITIES as INITIAL_OPPORTUNITIES } from './constants';
import { Actor, Resource, Application, Opportunity, JobApplication } from './types';

interface DataContextType {
  actors: Actor[];
  resources: Resource[];
  applications: Application[];
  opportunities: Opportunity[];
  jobApplications: JobApplication[];
  addActor: (actor: Actor) => void;
  updateActor: (actor: Actor) => void;
  deleteActor: (id: string) => void;
  addResource: (resource: Resource) => void;
  deleteResource: (id: string) => void;
  submitApplication: (app: Application) => void;
  deleteApplication: (id: string) => void;
  addOpportunity: (job: Opportunity) => void;
  applyToJob: (application: JobApplication) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actors, setActors] = useState<Actor[]>(ACTORS);
  const [resources, setResources] = useState<Resource[]>(RESOURCES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const addActor = (actor: Actor) => setActors(prev => [actor, ...prev]);

  const updateActor = (updatedActor: Actor) => {
    setActors(prev => prev.map(a => a.id === updatedActor.id ? updatedActor : a));
  };

  const deleteActor = (id: string) => {
    setActors(prev => prev.filter(a => a.id !== id));
  };

  const addResource = (resource: Resource) => {
    setResources(prev => [resource, ...prev]);
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const submitApplication = (app: Application) => {
    const newApp = { ...app, id: app.id || `app-${Date.now()}` };
    setApplications(prev => [newApp, ...prev]);
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const addOpportunity = (job: Opportunity) => {
    setOpportunities(prev => [job, ...prev]);
  };

  const applyToJob = (application: JobApplication) => {
    setJobApplications(prev => [application, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      actors,
      resources,
      applications,
      opportunities,
      jobApplications,
      addActor,
      updateActor,
      deleteActor,
      addResource,
      deleteResource,
      submitApplication,
      deleteApplication,
      addOpportunity,
      applyToJob
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
