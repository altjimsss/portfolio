import React, { useState } from 'react';

const CircularGallery = React.forwardRef(
  ({ items, className, radius = 600, projectsData = [], ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleNumberClick = (index) => {
      const targetRotation = -index * (360 / items.length);
      setRotation(targetRotation);
    };

    const handleViewDetails = (projectIndex) => {
      const project = projectsData[projectIndex];
      if (project) {
        setSelectedProject(project);
      }
    };

    const handleCloseDetails = (e) => {
      e.stopPropagation(); // Prevent event bubbling
      setSelectedProject(null);
    };

    // Close modal when clicking on backdrop (but not content)
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        setSelectedProject(null);
      }
    };

    const anglePerItem = 360 / items.length;
    
    const getActiveIndex = () => {
      const normalizedRotation = (360 - (rotation % 360)) % 360;
      const index = Math.round(normalizedRotation / anglePerItem) % items.length;
      return index;
    };

    const activeIndex = getActiveIndex();

    if (!items || items.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-white/60">
          No projects to display
        </div>
      );
    }

    return (
      <>
        {/* Project Details Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl"
            onClick={handleBackdropClick}
          >
            <div className="relative bg-gray-900/90 backdrop-blur-3xl rounded-3xl border border-white/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header with close button on left */}
              <div className="flex items-center justify-between p-6 border-b border-white/30 bg-black/50 backdrop-blur-2xl">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCloseDetails}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-300 z-[10000] relative flex items-center gap-2 backdrop-blur-2xl border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/40"
                    aria-label="Close details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-xs font-medium hidden sm:block">Close</span>
                  </button>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                  <p className="text-white/70 text-xs mt-1">{selectedProject.category}</p>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-auto max-h-[70vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Image */}
                  <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden border border-white/30 backdrop-blur-2xl">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">Description</h4>
                      <p className="text-white/80 leading-relaxed text-sm">{selectedProject.description}</p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.technologies?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-full text-white text-xs hover:bg-white/25 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-white mb-1">Year</h4>
                        <p className="text-white/80 text-sm">{selectedProject.year}</p>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-1">Status</h4>
                        <span className={`px-2 py-1 rounded-full text-xs backdrop-blur-2xl border ${
                          selectedProject.status === 'Active' ? 'bg-green-400/25 text-green-400 border-green-400/40' :
                          selectedProject.status === 'Completed' ? 'bg-blue-400/25 text-blue-400 border-blue-400/40' :
                          'bg-gray-400/25 text-gray-400 border-gray-400/40'
                        }`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons with Glass Morphism */}
                    <div className="flex gap-2 pt-3">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-black font-semibold py-2 rounded-lg hover:shadow-xl hover:shadow-green-400/30 transition-all duration-300 transform hover:scale-105 text-center backdrop-blur-2xl border border-white/30 relative overflow-hidden group text-sm"
                      >
                        <div className="absolute inset-0 bg-white/25 group-hover:bg-white/35 transition-all duration-300"></div>
                        <span className="relative z-10">Live Demo</span>
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/15 backdrop-blur-2xl text-white font-semibold py-2 rounded-lg border border-white/30 hover:border-green-400/60 hover:bg-white/20 transition-all duration-300 text-center relative overflow-hidden group text-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="relative z-10">GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Container */}
        <div
          ref={ref}
          className={`relative w-full flex items-center justify-center bg-transparent ${className} ${
            selectedProject ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
          style={{ zIndex: selectedProject ? 1 : 'auto' }}
          {...props}
        >
          {/* Minimal Mobile Navigation - Smaller numbers */}
          <div className="lg:hidden absolute left-1 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-1">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(index)}
                className={`w-6 h-6 rounded-md text-[10px] transition-all duration-300 font-medium flex items-center justify-center backdrop-blur-2xl border ${
                  activeIndex === index
                    ? 'bg-green-400/90 text-black scale-110 border-green-400/60 shadow-md shadow-green-400/40'
                    : 'text-white/60 hover:text-white/80 hover:scale-105 bg-white/15 border-white/25 hover:bg-white/20 hover:border-white/35'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Minimal Desktop Navigation - Smaller numbers */}
          <div className="hidden lg:flex absolute left-8 top-1/2 transform -translate-y-1/2 z-30 flex-col gap-1">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(index)}
                className={`w-7 h-7 rounded-lg text-xs transition-all duration-300 font-medium flex items-center justify-center backdrop-blur-2xl border ${
                  activeIndex === index
                    ? 'bg-green-400/90 text-black scale-110 border-green-400/60 shadow-lg shadow-green-400/40'
                    : 'text-white/60 hover:text-white/80 hover:scale-105 bg-white/15 border-white/25 hover:bg-white/20 hover:border-white/35'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Gallery Content */}
          <div className="relative w-full h-[60vh] lg:h-full" style={{ perspective: '2000px' }}>
            <div
              className="relative w-full h-full"
              style={{
                transform: `rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {items.map((item, i) => {
                const project = projectsData[i];
                const itemAngle = i * anglePerItem;
                const totalRotation = rotation % 360;
                const relativeAngle = (itemAngle + totalRotation + 360) % 360;
                const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
                const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));
                const scale = Math.max(0.7, 1 - (normalizedAngle / 360));

                return (
                  <div
                    key={project?.id || i}
                    className="absolute w-[250px] h-[350px] lg:w-[280px] lg:h-[380px] cursor-pointer"
                    style={{
                      transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                      left: '50%',
                      top: '50%',
                      marginLeft: '-125px',
                      marginTop: '-175px',
                      opacity: opacity,
                      transition: 'all 0.5s ease-out'
                    }}
                    onClick={() => handleViewDetails(i)}
                  >
                    {/* Project Card Content */}
                    <div className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden group border-2 border-white/30 bg-black/60 backdrop-blur-2xl hover:border-green-400/60 transition-all duration-500">
                      <img
                        src={project?.image || item.photo?.url}
                        alt={project?.title || item.common}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        style={{ objectPosition: 'center' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 text-white">
                        <h2 className="text-lg lg:text-2xl font-bold mb-1 lg:mb-2 drop-shadow-lg">
                          {project?.title || item.common}
                        </h2>
                        <em className="text-xs lg:text-sm italic opacity-90 block mb-2 lg:mb-3">
                          {project?.category || item.binomial}
                        </em>
                        <p className="text-xs opacity-80 leading-relaxed mb-2 lg:mb-3 line-clamp-2">
                          {project?.description || item.photo?.text}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs opacity-70 backdrop-blur-2xl bg-black/40 px-2 py-1 rounded-full border border-white/30">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                              project?.status === 'Active' ? 'bg-green-400' :
                              project?.status === 'Completed' ? 'bg-blue-400' :
                              'bg-gray-400'
                            }`}></span>
                            {project?.status || 'Active'}
                          </span>
                          <button 
                            className="text-xs bg-green-400/25 backdrop-blur-2xl text-green-400 px-2 py-1.5 rounded-lg border border-green-400/40 hover:bg-green-400/35 hover:border-green-400/60 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(i);
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <span className="relative z-10">View Details</span>
                          </button>
                        </div>
                      </div>

                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                        style={{
                          background: `linear-gradient(to right, ${project?.accentColor || '#10B981'}15, ${project?.accentColor || '#3B82F6'}15)`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };